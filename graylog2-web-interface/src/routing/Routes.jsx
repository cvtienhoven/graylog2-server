const Routes = {
  HOME: '/',
  SEARCH: '/search',
  STREAMS: '/streams',
  SOURCES: '/sources',
  DASHBOARDS: '/dashboards',
  GETTING_STARTED: '/gettingstarted',
  SYSTEM: {
    COLLECTORS: '/system/collectors',
    CONTENTPACKS: {
      LIST: '/system/contentpacks',
      EXPORT: '/system/contentpacks/export',
    },
    GROKPATTERNS: '/system/grokpatterns',
    INDICES: {
      LIST: '/system/indices',
      FAILURES: '/system/indices/failures',
    },
    INPUTS: '/system/inputs',
    LOGGING: '/system/logging',
    METRICS: (nodeId) => '/system/metrics/node/' + nodeId,
    NODES: {
      LIST: '/system/nodes',
      SHOW: (nodeId) => '/system/nodes/' + nodeId,
    },
    OUTPUTS: '/system/outputs',
    OVERVIEW: '/system/overview',
    ROLES: '/system/roles',
    USERS: {
      CREATE: '/system/users/new',
      edit: (username) => '/system/users/edit/' + username,
      LIST: '/system/users',
    },
    LDAP: "/system/ldap",
  },
  message_show: (index, messageId) => `/messages/${index}/${messageId}`,
  stream_edit: (streamId) => '/streams/' + streamId + '/edit',
  stream_outputs: (streamId) => '/streams/' + streamId + '/outputs',
  stream_alerts: (streamId) => '/streams/' + streamId + '/alerts',
  stream_search: (streamId) => '/streams/' + streamId + '/search',
  startpage_set: (type, id) => '/startpage/set/' + type + '/' + id,

  dashboard_show: (dashboardId) => '/dashboards/' + dashboardId,

  node: (nodeId) => `/system/nodes/${nodeId}`,

  global_input_extractors: (inputId) => `/system/inputs/${inputId}/extractors`,
  local_input_extractors: (nodeId, inputId) => `/system/inputs/${nodeId}/${inputId}/extractors`,
  export_extractors: (nodeId, inputId) => `${Routes.local_input_extractors(nodeId, inputId)}/export`,
  import_extractors: (nodeId, inputId) => `${Routes.local_input_extractors(nodeId, inputId)}/import`,
  new_extractor: (nodeId, inputId) => {
    return `/system/inputs/${nodeId}/${inputId}/extractors/new`;
  },
  edit_extractor: (nodeId, inputId, extractorId) => `/system/inputs/${nodeId}/${inputId}/extractors/${extractorId}/edit`,

  edit_input_extractor: (nodeId, inputId, extractorId) => `/system/inputs/${nodeId}/${inputId}/extractors/${extractorId}/edit`,
};

export default Routes;
