export default {
  methods: {
    datapointLink (dataType, datapointId) {
      if (dataType === 'BH' || dataType === 'TH') {
        return { name: 'BoreholeDetail', params: { id: this.$route.params.id, bh: datapointId } }
      } else {
        return { name: 'InstrumentDetail', params: { id: this.$route.params.id, instr: datapointId } }
      }
    }
  }
}
