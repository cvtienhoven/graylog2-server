import Reflux from 'reflux';

import URLUtils from 'util/URLUtils';
import fetch from 'logic/rest/FetchProvider';
import UserNotification from 'util/UserNotification';

import InputStaticFieldsStore from 'stores/inputs/InputStaticFieldsStore';
import InputsActions from 'actions/inputs/InputsActions';

const InputsStore = Reflux.createStore({
  listenables: [InputsActions],
  sourceUrl: '/system/inputs',
  inputs: undefined,
  input: undefined,

  init() {
    this.trigger({inputs: this.inputs, input: this.input});
    this.listenTo(InputStaticFieldsStore, this.list);
  },

  list() {
    const promise = fetch('GET', URLUtils.qualifyUrl(this.sourceUrl))
      .then(response => {
        this.inputs = response.inputs;
        this.trigger({inputs: this.inputs});

        return this.inputs;
      })
      .catch(error => {
        UserNotification.error('Fetching Inputs failed with status: ' + error,
          'Could not retrieve Inputs');
      });

    InputsActions.list.promise(promise);
  },

  get(inputId) {
    const promise = fetch('GET', URLUtils.qualifyUrl(`${this.sourceUrl}/${inputId}`));

    promise
      .then(response => {
        this.input = response;
        this.trigger({input: this.input});

        return this.input;
      })
      .catch(error => {
        UserNotification.error(`Fetching input ${inputId} failed with status: ${error}`,
          'Could not retrieve input');
      });

    InputsActions.get.promise(promise);
  },

  create(input) {
    const promise = fetch('POST', URLUtils.qualifyUrl(this.sourceUrl), input);
    promise
      .then(() => {
        UserNotification.success(`Input '${input.title}' launched successfully`);
        InputsActions.list();
      })
      .catch(error => {
        UserNotification.error(`Launching input '${input.title}' failed with status: ${error}`,
          'Could not launch input');
      });

    InputsActions.create.promise(promise);
  },

  delete(input) {
    const inputId = input.id;
    const inputTitle = input.title;

    const promise = fetch('DELETE', URLUtils.qualifyUrl(`${this.sourceUrl}/${inputId}`));
    promise
      .then(() => {
        UserNotification.success(`Input '${inputTitle}' deleted successfully`);
        InputsActions.list();
      })
      .catch(error => {
        UserNotification.error(`Deleting input '${inputTitle}' failed with status: ${error}`,
          'Could not delete input');
      });

    InputsActions.delete.promise(promise);
  },

  update(id, input) {
    const promise = fetch('PUT', URLUtils.qualifyUrl(`${this.sourceUrl}/${id}`), input);
    promise
      .then(() => {
        UserNotification.success(`Input '${input.title}' updated successfully`);
        InputsActions.list();
      })
      .catch(error => {
        UserNotification.error(`Updating input '${input.title}' failed with status: ${error}`,
          'Could not update input');
      });

    InputsActions.update.promise(promise);
  }
});

InputsStore.inputsAsMap = (inputsList) => {
  const inputsMap = {};
  inputsList.forEach(input => {
    inputsMap[input.id] = input;
  });
  return inputsMap;
};

export default InputsStore;
