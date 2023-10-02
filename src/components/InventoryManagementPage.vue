<template>
  <v-row no-gutters>
    <v-col class="mx-4">
      <v-text-field
        class="px-3"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="stockData"
        :search="search"
        :items-per-page="25"
      >
        <template v-slot:item.stockLevel="{ item }">
          <v-row no-gutters align="center">
            <span class="mr-2">{{ item.stockLevel }}</span>
            <v-chip v-if="item.stockLevel < 10" small dark color="red">
              LOW
            </v-chip>
          </v-row>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Product</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="editedItem.name"
                    label="Product Name"
                  ></v-text-field>

                  <v-textarea
                    v-model="editedItem.description"
                    label="Description"
                    :counter="500"
                  ></v-textarea>

                  <v-text-field
                    v-model="editedItem.price"
                    label="Price"
                    type="number"
                  >
                    <v-icon slot="prepend"> mdi-currency-usd </v-icon>
                  </v-text-field>

                  <v-text-field
                    v-model="editedItem.stockLevel"
                    label="Remaining Stock"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveItem"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { dataService } from "../data";
export default {
  name: "inventory-management-page",
  data() {
    return {
      headers: [
        {
          text: "Product Name",
          sortable: true,
          value: "name",
        },
        {
          text: "Description",
          sortable: true,
          value: "description",
          width: "40%",
        },
        { text: "Price ($)", sortable: true, value: "price" },
        {
          text: "Remaining Stock",
          sortable: true,
          value: "stockLevel",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      stockData: dataService.data,
      search: "",
      editedItem: {
        name: "",
        description: "",
        price: 0,
        stockLevel: 0,
        index: 0,
      },
      dialog: false,
    };
  },
  methods: {
    deleteItem(item) {
      let index = this.stockData.findIndex((stockItem) => {
        return JSON.stringify(stockItem) === JSON.stringify(item);
      });
      if (index > -1) {
        this.stockData.splice(index, 1);
      }
    },
    editItem(item) {
      let index = this.stockData.findIndex((stockItem) => {
        return JSON.stringify(stockItem) === JSON.stringify(item);
      });
      if (index > -1) {
        this.editedItem = { ...this.stockData[index], index: index };
        this.dialog = true;
      }
    },
    saveItem() {
      this.stockData.splice(this.editedItem.index, 1, this.editedItem);
      this.dialog = false;
    },
  },
};
</script>

<style></style>
