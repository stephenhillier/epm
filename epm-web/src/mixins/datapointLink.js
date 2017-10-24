export default {
  methods: {
    datapointLink (dataType, datapointId) {
      if (dataType === 'BH' || dataType === 'TH') {
        return { name: 'BoreholeDetail', params: { id: this.project.id, bh: datapointId } }
      } else {
        return { name: 'InstrumentDetail', params: { id: this.project.id, instr: datapointId } }
      }
    }
  }
}
