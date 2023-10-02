<template>
  <v-row no-gutters>
    <v-col>
      <v-row no-gutters>
        <v-col>
          <v-card elevation="0">
            <v-card-title class="pt-0">
              <span>Total Orders</span>
              <v-spacer></v-spacer>
              <v-btn
                @click="changeOrderFilter(0)"
                class="mr-2"
                :class="{ 'active-filter': orderFilter === 0 }"
                >Daily</v-btn
              >
              <v-btn
                @click="changeOrderFilter(1)"
                class="mr-2"
                :class="{ 'active-filter': orderFilter === 1 }"
                >Weekly</v-btn
              >
              <v-btn
                @click="changeOrderFilter(2)"
                class="mr-2"
                :class="{ 'active-filter': orderFilter === 2 }"
                >Monthly</v-btn
              >
              <v-btn
                @click="changeOrderFilter(3)"
                :class="{ 'active-filter': orderFilter === 3 }"
                >Annually</v-btn
              >
            </v-card-title>
            <v-card-text>
              <v-row no-gutters>
                <v-btn
                  :disabled="orderChartLimit === 10"
                  @click="
                    orderChartLimit -= 10;
                    reloadOrderChart();
                  "
                >
                  <v-icon>mdi-chevron-left</v-icon>
                  <span>Next</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="orderChartLimit >= totalOrdersData.length - 1"
                  @click="
                    orderChartLimit += 10;
                    reloadOrderChart();
                  "
                >
                  <span>Previous</span>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
              <ag-charts-vue
                class="mt-2"
                :options="totalOrdersOptions"
              ></ag-charts-vue>
            </v-card-text>
          </v-card>
          <v-card elevation="0">
            <v-card-title class="pt-0">
              <span>Total Sales</span>
              <v-spacer></v-spacer>
              <v-btn
                @click="changeSalesFilter(0)"
                class="mr-2"
                :class="{ 'active-filter': salesFilter === 0 }"
                >Daily</v-btn
              >
              <v-btn
                @click="changeSalesFilter(1)"
                class="mr-2"
                :class="{ 'active-filter': salesFilter === 1 }"
                >Weekly</v-btn
              >
              <v-btn
                @click="changeSalesFilter(2)"
                class="mr-2"
                :class="{ 'active-filter': salesFilter === 2 }"
                >Monthly</v-btn
              >
              <v-btn
                @click="changeSalesFilter(3)"
                :class="{ 'active-filter': salesFilter === 3 }"
                >Annually</v-btn
              >
            </v-card-title>
            <v-card-text>
              <v-row no-gutters>
                <v-btn
                  :disabled="orderChartLimit === 10"
                  @click="
                    orderChartLimit -= 10;
                    reloadOrderChart();
                  "
                >
                  <v-icon>mdi-chevron-left</v-icon>
                  <span>Next</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="orderChartLimit >= totalOrdersData.length - 1"
                  @click="
                    orderChartLimit += 10;
                    reloadOrderChart();
                  "
                >
                  <span>Previous</span>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
              <ag-charts-vue
                class="mt-2"
                :options="totalSalesOptions"
              ></ag-charts-vue>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import { AgChartsVue } from "ag-charts-vue";
import { dataService } from "../data";

export default {
  name: "analytics-page",
  data() {
    return {
      totalOrdersOptions: {
        autoSize: true,
        data: null,
        series: [
          {
            type: "column",
            xKey: "timestamp",
            yKey: "count",
            yName: "Orders",
          },
        ],
      },
      totalSalesOptions: {
        autoSize: true,
        data: null,
        series: [
          {
            type: "column",
            xKey: "timestamp",
            yKey: "sales",
            yName: "Dollars ($)",
          },
        ],
      },
      orderData: [],
      orderFilter: 0,
      salesFilter: 0,
      orderChartLimit: 10,
      salesChartLimit: 10,
    };
  },
  components: {
    "ag-charts-vue": AgChartsVue,
  },
  created() {
    this.totalOrdersOptions.data = this.totalOrdersData.slice(
      this.orderChartLimit - 10,
      this.orderChartLimit
    );
    this.totalSalesOptions.data = this.totalSalesData.slice(
      this.salesChartLimit - 10,
      this.salesChartLimit
    );
  },
  computed: {
    totalOrdersData() {
      let data = {};
      data = dataService.orderData.reduce((obj, item) => {
        let momentDate = moment(item.timestamp);
        let key = "";
        switch (this.orderFilter) {
          case 0:
            key = momentDate.format("DD/MM/YYYY");
            break;
          case 1:
            key = `W${Math.ceil(momentDate.date() / 7)}, ${momentDate.format(
              "MMM, YYYY"
            )}`;
            break;
          case 2:
            key = momentDate.format("MMM, YYYY");
            break;
          case 3:
            key = momentDate.format("YYYY");
            break;
          default:
            key = momentDate.format("DD/MM/YYYY");
        }
        if (obj[key]) {
          obj[key].count += 1;
        } else {
          obj[key] = {
            timestamp: key,
            count: 1,
          };
        }
        return obj;
      }, {});
      return Object.values(data);
    },
    totalSalesData() {
      let data = {};
      data = dataService.orderData.reduce((obj, item) => {
        let momentDate = moment(item.timestamp);
        let key = "";
        switch (this.salesFilter) {
          case 0:
            key = momentDate.format("DD/MM/YYYY");
            break;
          case 1:
            key = `W${Math.ceil(momentDate.date() / 7)}, ${momentDate.format(
              "MMM, YYYY"
            )}`;
            break;
          case 2:
            key = momentDate.format("MMM, YYYY");
            break;
          case 3:
            key = momentDate.format("YYYY");
            break;
          default:
            key = momentDate.format("DD/MM/YYYY");
        }
        if (obj[key]) {
          obj[key].sales += item.total;
        } else {
          obj[key] = {
            timestamp: key,
            sales: item.total,
          };
        }
        return obj;
      }, {});
      return Object.values(data);
    },
  },
  methods: {
    reloadOrderChart() {
      this.totalOrdersOptions = {
        ...this.totalOrdersOptions,
        data: this.totalOrdersData.slice(
          this.orderChartLimit - 10,
          this.orderChartLimit
        ),
      };
    },
    reloadSalesChart() {
      this.totalSalesOptions = {
        ...this.totalSalesOptions,
        data: this.totalSalesData.slice(
          this.salesChartLimit - 10,
          this.salesChartLimit
        ),
      };
    },
    changeOrderFilter(filter) {
      this.orderFilter = filter;
      this.orderChartLimit = 10;
      this.reloadOrderChart();
    },
    changeSalesFilter(filter) {
      this.salesFilter = filter;
      this.salesChartLimit = 10;
      this.reloadSalesChart();
    },
  },
};
</script>

<style scoped>
.active-filter {
  background-color: rgb(243 99 45) !important;
  color: white;
}
</style>
