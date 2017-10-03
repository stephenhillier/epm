<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-title dark class='primary info--text'>Projects:</v-card-title>
                <v-card-text>
                <v-data-table
                    v-bind:headers='headers'
                    :items='items'
                    hide-actions
                    class='elevation-1'>
                <template slot='items' scope='props'>
                    <td>{{ props.item.name }}</td>
                    <td class='text-xs-right'>{{ props.item.number }}</td>
                    <td class='text-xs-right'>{{ props.item.location }}</td>
                    <td class='text-xs-right'>{{ props.item.pm }}</td>
                    <td class='text-xs-right'>{{ props.item.client }}</td>
                </template>
                </v-data-table></v-card-text>
            </v-card>    
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Project',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Proj. number', value: 'number' },
          { text: 'Location', value: 'location' },
          { text: 'PM', value: 'pm' },
          { text: 'Client', value: 'client' }
        ],
        items: [
          {
            'id': 1,
            'number': '2017-001',
            'name': 'Steve and Vivian\'s Mansion',
            'pm': 'steve',
            'location': 'View Royal, BC',
            'client': 'Viracal Construction',
            'datapoints': [
              4,
              5
            ],
            'xpoint': -123.434844,
            'ypoint': 48.448276
          },
          {
            'id': 2,
            'number': '2017-002',
            'name': 'Esquimalt Towers',
            'pm': 'steve',
            'location': 'Esquimalt, BC',
            'client': 'Viracal Construction',
            'datapoints': [
              7
            ],
            'xpoint': -123.434844,
            'ypoint': 48.450276
          },
          {
            'id': 3,
            'number': '2017-003',
            'name': 'James Bay Parkway',
            'pm': 'steve',
            'location': 'Victoria, BC',
            'client': 'Viracal Construction',
            'datapoints': [
              8,
              9
            ],
            'xpoint': -123.38069208767634,
            'ypoint': 48.41932851960125
          },
          {
            'id': 4,
            'number': '2017-004',
            'name': 'Saanich Mall',
            'pm': 'steve',
            'location': 'Saanich, BC',
            'client': 'Steve Industries',
            'datapoints': []
          },
          {
            'id': 5,
            'number': '2017-005',
            'name': 'Sidney Sewer Replacement',
            'pm': 'steve',
            'location': 'Sidney, BC',
            'client': 'Steve Industries',
            'datapoints': []
          },
          {
            'id': 6,
            'number': '2017-006',
            'name': 'Rat Hill Highway',
            'pm': 'steve',
            'location': 'Yellowknife, NT',
            'client': 'Steve Industries',
            'datapoints': []
          }
        ]
      }
    }
  }
</script>
<style>
@import '~leaflet/dist/leaflet.css';
</style>
