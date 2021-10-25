export default {
    async registerTutor(context, data) {
        const tutorData = {
            id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        const response = await fetch(
            `put-url`,
            {
                method: 'PUT',
                body: JSON.stringify(tutorData)
            }
        );

        if (response.ok) {
            context.commit('registerTutor', {
                ...tutorData,
                id: userId
            });
        } else {
            const responseData = await response.json();
            const error = new Error(`${responseData.message || 'Ragistration attempt failed.'} Please try again.`);
            throw error;
        }
    },
    async loadTutors(context, payload) {
        if (!payload.forceRefresh && !context.getters.forceUpdate) {
            return;
        }

        const response = await fetch('get-url');
        const responseData = await response.json();

        if (response.ok) {
            const tutors = [];

            for (const key in responseData) {
                const tutor = {
                    id: `${responseData[key].lastName}_key`,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    description: responseData[key].description,
                    hourlyRate: responseData[key].hourlyRate,
                    areas: responseData[key].areas
                };
                tutors.push(tutor);
            }

            context.commit('setTutors', tutors);
            context.commit('setFetchTimestamp');
        } else {
            const error = new Error(`${responseData.message || 'Couldn\'t load tutors.'} Please try again.`);
            throw error;
        }
    }
};