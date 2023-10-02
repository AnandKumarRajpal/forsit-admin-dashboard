<template>
    <v-row no-gutters>
        <v-col class="mx-4">
            <p class="text-h6">Add a product</p>
            <v-form v-model="valid" ref="productForm">
                <v-text-field
                    v-model="formModel.name"
                    :rules="rules"
                    label="Product Name"
                    required
                    outlined
                ></v-text-field>

                <v-textarea
                    v-model="formModel.description"
                    :rules="rules"
                    label="Description"
                    required
                    :counter="500"
                    outlined
                ></v-textarea>

                <v-text-field
                    v-model="formModel.price"
                    :rules="rules"
                    label="Price"
                    required
                    type="number"
                    outlined
                >
                    <v-icon slot="prepend"> mdi-currency-usd </v-icon>
                </v-text-field>

                <v-text-field
                    v-model="formModel.stockLevel"
                    :rules="rules"
                    label="Stock Level"
                    required
                    type="number"
                    outlined
                ></v-text-field>

                <v-file-input
                    accept="image/*"
                    label="Product Images"
                    multiple
                    prepend-icon="mdi-camera"
                    v-model="formModel.images"
                ></v-file-input>

                <v-btn
                    color="primary"
                    @click="addNewProduct"
                    :disabled="!valid"
                >
                    Add product
                </v-btn>
                <!-- localStorage.getItem(`${this.formModel.id}-img-${index}`); -->
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios";
import { dataService } from "../data";

export default {
    name: "product-registration-page",
    data() {
        return {
            productData: dataService.data,
            formModel: {
                name: null,
                description: null,
                price: null,
                stockLevel: null,
                images: [],
                id: dataService.data.length + 1,
            },
            rules: [(v) => !!v || "Field is required"],
            valid: false
        };
    },
    methods: {
        addNewProduct() {
            if (this.formModel.images.length) {
                this.formModel.images.forEach((image, index) => {
                    const reader = new FileReader();

                    reader.addEventListener("load", () => {
                        localStorage.setItem(
                            `${this.formModel.id}-img-${index}`,
                            reader.result
                        );
                    });

                    if (image) {
                        reader.readAsDataURL(image);
                    }
                });
            }
            this.productData.push(this.formModel);
            this.$refs.productForm.reset();
            this.$toasted.success("Product added successfully!", {
                duration: 2000,
            });
        },
        save(file) {
            let formData = new FormData();

            formData.append("file", file);

            axios
                .post("src/assets/media", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(function () {
                    console.log("SUCCESS!!");
                })
                .catch(function (err) {
                    console.log("FAILURE!!", err);
                });
        },
    },
};
</script>

<style></style>
