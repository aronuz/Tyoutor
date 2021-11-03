
import httpRequest from "@/common/httpRequest.js";

export default {
    async fetchAreas(context, data) {
        const response = await httpRequest(`api/tutors/${data.tutorId}/areas/`);

        if (result in response) {
            const areas = [];
            let area;
            for (let item of response.result) {
                area = {
                    tutorId: item.tutorId,
                    areas: item.areas
                };
                areas.push(area);
            }

            context.commit('setAreas', areas);
        } else {
            const error = new Error(`${response.error || 'Failed to fetch expertise.'} Please try again`);
            throw error;
        }
    },
    async addArea(context, data) {
        const areaData = {
            areas: data.areasList
        }

        const response = await httpRequest(`api/tutors/area/`, 'post', data.areasList);

        if (response.data) {
            areaData[tutorId] = context.rootGetters.userId
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
        const response = await httpRequest(`api/tutors/area/${areaId}/`, 'delete');

        if (result in response) {
            Object.assign(data, { tutorId })
            context.commit('removeArea', data);
        } else {
            const error = new Error(`${response.error || 'Couldn\'t load tutors.'} Please try again.`);
            throw error;
        }
    }
};