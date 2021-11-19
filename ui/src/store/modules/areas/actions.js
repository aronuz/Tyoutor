
import httpRequest from "@/common/httpRequest.js";

export default {
    fetchAreas(context) { //, data
        const areas = [];
        let area;
        // for (let id of data) {
        //httpRequest(`tutors/${id}/areas/`, 'get').then((data) => {
        httpRequest(`areas/`, 'get').then((data) => {
            for (let item of data[0]) {
                area = {
                    tutorId: item.tutor_id,
                    createdAt: item.created_at,
                    areaId: item.area_id,
                    areas: item.area
                };
                areas.push(area);
            }
            if (areas.length) context.commit('setAreas', areas);
        }).catch(data => {
            const e = new Error(`${data.error || 'Failed to fetch expertise.'} Please try again`);
            throw e;
        })
        // }
    },
    async addArea(context, data) {
        const areaData = {
            areas: data.areasList
        }

        const response = await httpRequest(`tutors/area/`, 'post', data.areasList);

        if (response.data) {
            areaData[data.tutorId] = context.rootGetters.userId
            context.commit('addArea', areaData);
        } else {
            const error = new Error(`${response.error || 'Couldn\'t load tutors.'} Please try again.`);
            throw error;
        }
    },
    async removeArea(context, data) {
        if (!data.forceRefresh && !context.getters.forceUpdate) {
            return;
        }

        const tutorId = context.rootGetters.userId;
        const area = data[area];
        const areaId = `${area}@${tutorId}`;
        const response = await httpRequest(`tutors/area/${areaId}/`, 'delete');

        if ('result' in response) {
            Object.assign(data, { tutorId })
            context.commit('removeArea', data);
        } else {
            const error = new Error(`${response.error || 'Couldn\'t load tutors.'} Please try again.`);
            throw error;
        }
    }
};