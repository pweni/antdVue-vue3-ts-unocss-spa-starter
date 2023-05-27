import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// types in src/types folder
// import type * as calSingleAdmeTypes from 'src/types/response/admet/calSingleAdmet'

import { errorNotify } from 'utils/notifys'
export const useResultsStore = defineStore('results', {
    state: () => ({
        /**
         * admetlab2
         */
        // 请求 /api/admetlab2/calSingleADME
        calSingleAdmeResult: {
            loading: true,
            data: null as calSingleAdmeTypes.Root | null,
        },
    }),
    actions: {},
})
