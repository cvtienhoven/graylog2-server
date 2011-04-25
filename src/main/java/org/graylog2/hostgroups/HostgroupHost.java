/**
 * Copyright 2011 Lennart Koopmann <lennart@socketfeed.com>
 *
 * This file is part of Graylog2.
 *
 * Graylog2 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Graylog2 is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Graylog2.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

package org.graylog2.hostgroups;

import com.mongodb.DBObject;
import org.bson.types.ObjectId;

/**
 * HostgroupHost.java: Apr 15, 2011 12:04:02 AM
 *
 * Representing a host or regex-rule in a hostgroup.
 *
 * @author: Lennart Koopmann <lennart@socketfeed.com>
 */
public class HostgroupHost {

    public static final int TYPE_SIMPLE = 0;
    public static final int TYPE_REGEX = 1;


    private ObjectId objectId = null;
    private int hostgroupId = 0;
    private int type = -1;
    private String hostname = null;

    private DBObject mongoObject = null;

    public HostgroupHost(DBObject rule) {
        this.objectId = (ObjectId) rule.get("_id");
        this.hostgroupId = (Integer) rule.get("hostgroup_id");
        this.type = (Integer) rule.get("ruletype");
        this.hostname = (String) rule.get("hostname");

        this.mongoObject = rule;
    }

    /**
     * @return the objectId
     */
    public ObjectId getObjectId() {
        return objectId;
    }

    /**
     * @param objectId the objectId to set
     */
    public void setObjectId(ObjectId objectId) {
        this.objectId = objectId;
    }

    /**
     * @return the hostgroupId
     */
    public int getHostgroupId() {
        return hostgroupId;
    }

    /**
     * @param hostgroupId the hostgroupId to set
     */
    public void setHostgroupId(int hostgroupId) {
        this.hostgroupId = hostgroupId;
    }

    /**
     * @return the type
     */
    public int getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(int type) {
        this.type = type;
    }

    /**
     * @return the hostname
     */
    public String getHostname() {
        return hostname;
    }

    /**
     * @param hostname the hostname to set
     */
    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

}
