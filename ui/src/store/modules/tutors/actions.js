
import httpRequest from "@/common/httpRequest.js";

export default {
    async registerTutor(context, data) {
        const tutorId = context.rootGetters.userId
        const tutorData = {
            tutorId,
            description: data.desc,
            hourlyRate: data.rate
        };

        const areaData = {
            tutorId,
            areas: data.areas
        }

        const response = await httpRequest('api/tutors/', 'post', tutorData);
        // const response = await fetch(
        //     `put-url`,
        //     {
        //         method: 'PUT',
        //         body: JSON.stringify(tutorData)
        //     }
        // );

        if (response.data) { //response.ok
            context.commit('registerTutor',
                tutorData
            );
            context.commit('areas/addArea',
                areaData
            );
        } else {
            const error = new Error(`${response.error || 'Couldn\'t load tutors.'} Please try again.`);
            throw error;
        }
    },
    async loadTutors(context, data) {
        if (!data.forceRefresh && !context.getters.forceUpdate) {
            return;
        }

        const response = await httpRequest('api/tutors/');

        if (result in response) {
            const tutors = [];
            let tutor, areas;

            for (let item of response.result) {
                areas = []
                for (let area of item.areas) {
                    areas.push(area)
                }
                tutor = {
                    id: item.tutor_id,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    description: `${item.description.substr(0, 10)}...`,
                    hourlyRate: item.hourlyRate,
                    areas: areas
                };
                tutors.push(tutor);
            }

            context.commit('setTutors', tutors);
            context.commit('setFetchTimestamp');
        } else {
            const error = new Error(`${response.error || 'Couldn\'t load tutors.'} Please try again.`);
            throw error;
        }
    }
};