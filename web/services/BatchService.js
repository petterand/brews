import Vue from 'vue';

export default {
   getBatches(recipeId, version) {
      let url = recipeId ? `/api/batch/${recipeId}` : '/api/batch/';
      if (recipeId && version) {
         url = `${url}/${version}`;
      }
      return Vue.http.get(url).then(response => {
         return Promise.resolve(response.body);
      }, err => {
         return Promise.reject(err);
      });
   },
   createBatch(batch) {
      batch.start_date = new Date().getTime();
      return Vue.http.post('/api/batch', batch).then(response => {
         if (response.body.status === 'added') {
            return Promise.resolve(response.body.batch);
         } else {
            return Promise.reject();
         }
      }, err => {
         return Promise.reject(err);
      });
   },
   startFermentation(batchId) {
      return Vue.http.put(`/api/batch/${batchId}/startFermentation`).then(response => {
         if (response.body.status === 'updated') {
            return Promise.resolve(response.body.batch);
         } else {
            return Promise.reject();
         }
      }, err => {
         return Promise.reject(err);
      });
   },
   stopFermentation(batchId) {
      return Vue.http.put(`/api/batch/${batchId}/stopFermentation`).then(response => {
         if (response.body.status === 'updated') {
            return Promise.resolve(response.body.batch);
         } else {
            return Promise.reject();
         }
      }, err => {
         return Promise.reject(err);
      });
   },
   saveNotes(batchId, _notes) {
      const notes = { notes: _notes };
      return Vue.http.put(`/api/batch/${batchId}/notes`, notes).then(response => {
         if (response.body.status === 'updated') {
            return Promise.resolve(response.body.batch);
         } else {
            return Promise.reject();
         }
      }, err => {
         return Promise.reject(err);
      })
   },
   saveMeasuredvalues(batchId, values) {
      return Vue.http.put(`/api/batch/${batchId}/measuredValues`, values).then(response => {
         if (response.body.status === 'updated') {
            return Promise.resolve(response.body.batch);
         } else {
            return Promise.reject();
         }
      }, err => {
         return Promise.reject(err);
      })
   },
   saveBrewfatherId(batchId, brewfatherId) {
      return Vue.http.put(`/api/batch/${batchId}/brewfatherId`, { brewfatherId }).then(response => {
         if (response.body.status === 'updated') {
            return Promise.resolve(response.body.batch);
         } else {
            return Promise.reject();
         }
      }, err => {
         return Promise.reject(err);
      })
   }
}