<template lang="">
  <div class="h-screen relative">
    <div class="image-wrap"><img :src="withBase('./al-qutub.jpeg')" /></div>
    <div class="table-wrap">
      <div class="table">
        <div
          class="row"
          v-for="(rowItem, rowIdx) in rowsCount"
          :class="'row-' + rowIdx"
        >
          <div
            v-for="(colItem, colIdx) in colsCount"
            :key="colIdx"
            :class="'col-' + colIdx"
            class="col"
          >
            <input
              v-model="gridData[rowIdx][colIdx]"
              @change="
                ($event) => evaluate($event.target.value, rowIdx, colIdx)
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="inputBox in floatingInputBoxes"
      :key="inputBox.id"
      :class="inputBox"
      class="floating-input-boxes"
    >
      <input type="text" v-model="form[inputBox]" />
    </div>

    <div class="floating-input-boxes totalAmount">
      <textarea type="text" rows="2" />
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

.relative {
  position: relative;
}
.image-wrap {
  position: absolute;
  z-index: -1;
}
.table-wrap {
  z-index: 1;
  position: absolute;
  display: flex;
  width: 170mm;
  justify-content: center;
  top: 72mm;
}
.table {
  width: 160mm;
  margin-right: 2mm;
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.row {
  display: flex;
}
.table .col {
  display: flex;
  vertical-align: baseline;
  overflow: hidden;
  text-align: center;
  /* display: inline-block; */
}
.table .col input {
  width: 100%;
  padding: 0 2px;
  text-align: inherit;
  color: black;
  background: transparent !important;
}
.table .row:first-child {
}
.row:nth-child(odd) {
  background: rgba(103, 34, 5, 0.7);
}
.row:nth-child(even) {
  background: rgba(5, 103, 5, 0.7);
}
.col:nth-child(odd) {
  background: rgba(5, 92, 103, 0.7);
}
.col:nth-child(even) {
  background: rgba(90, 103, 5, 0.7);
}
.table .col-0 {
  flex-basis: 8mm;
  text-align: center;
}
.table .col-1 {
  flex-basis: 66mm;
  text-align: left;
}
.table .col-2 {
  flex-basis: 11mm;
}
.table .col-3 {
  flex-basis: 10mm;
}
.table .col-4 {
  flex-basis: 8mm;
}
.table .col-5 {
  flex-basis: 10mm;
}
.table .col-6 {
  flex-basis: 7mm;
}
.table .col-7 {
  flex-basis: 10mm;
}
.table .col-8 {
  flex-basis: 8mm;
}
.table .col-9 {
  flex-basis: 14mm;
}
.table .col-10 {
  flex-basis: 8mm;
}

.table .row-0 {
  height: 6mm;
}
.table .row-1 {
  height: 6mm;
}
.table .row-2 {
  height: 6mm;
}
.table .row-3 {
  height: 6.2mm;
}
.table .row-4 {
  height: 6.5mm;
}
.table .row-5 {
  height: 6mm;
}
.table .row-6 {
  height: 7mm;
}
.table .row-7 {
  height: 6mm;
}
.table .row-8 {
  height: 6.5mm;
}
.table .row-9 {
  height: 6mm;
}
.table .row-10 {
  height: 6.5mm;
}
.table .row-11 {
  height: 6mm;
}
.table .row-12 {
  height: 6.5mm;
}
.table .row-13 {
  height: 6.2mm;
}
.table .row-14 {
  height: 6.5mm;
}
.table .row-15 {
  height: 6.2mm;
}
.table .row-16 {
  height: 6.5mm;
}
.table .row-17 {
  height: 6mm;
}
.floating-input-boxes:nth-child(odd) {
  background: rgba(199, 37, 214, 0.354);
}
.floating-input-boxes:nth-child(even) {
  background: rgba(219, 81, 18, 0.334);
}
.floating-input-boxes {
  position: absolute;
  z-index: 1;
  height: 4mm;
  display: flex;
}
.floating-input-boxes input {
  width: 100%;
  height: 4mm;
  font-size: 12px;
  flex: 1;
  color: black;
  background: transparent !important;
}
.floating-input-boxes.customerTrn {
  top: 30mm;
  left: 21mm;
  width: 32mm;
}
.floating-input-boxes.lpoNo {
  top: 35mm;
  left: 21mm;
  width: 32mm;
}
.floating-input-boxes.deliveryNo {
  top: 40mm;
  left: 21mm;
  width: 32mm;
}
.floating-input-boxes.invoiceNo {
  top: 33mm;
  right: 3mm;
  width: 32mm;
}
.floating-input-boxes.date {
  top: 40mm;
  right: 15mm;
  width: 30mm;
}
.floating-input-boxes.grossPayable {
  top: 179mm;
  right: 5mm;
  width: 35mm;
}
.floating-input-boxes.taxPayable {
  top: 185mm;
  right: 5mm;
  width: 35mm;
}
.floating-input-boxes.invoiceValue {
  top: 191.5mm;
  right: 5mm;
  width: 35mm;
}
.floating-input-boxes.ExchangeRate {
  top: 198mm;
  right: 5mm;
  width: 35mm;
}
.floating-input-boxes.totalAmount {
  top: 205mm;
  right: 34mm;
  width: 94mm;
  height: 8mm;
}
.floating-input-boxes.customerName {
  top: 50.5mm;
  left: 20mm;
  width: 132mm;
}

.floating-input-boxes.totalAmount textarea {
  height: 8mm;
  font-size: 12px;
  width: 100%;
  color: black;
  background: transparent !important;
}
@media print {
  .table .col,
  .table .row {
    background: transparent;
  }
  .table .col {
    border-bottom: 1px solid;
  }

  .floating-input-boxes {
    background: transparent !important;
  }
}
</style>

<script setup>
import { ref, watch } from "vue";
import { withBase } from "vitepress";
import * as _ from "lodash";

import { watchDebounced } from '@vueuse/core'

const rowsCount = ref(17);
const colsCount = ref(11);

const gridData = ref([]);
for (let row = 0; row < rowsCount.value; row++) {
  const rowValues = [];
  for (let col = 0; col < colsCount.value; col++) {
    rowValues.push("");
  }
  gridData.value.push(rowValues);
}

const floatingInputBoxes = ref([
  "customerTrn",
  "lpoNo",
  "deliveryNo",
  "invoiceNo",
  "customerName",
  "date",
  "grossPayable",
  "taxPayable",
  "invoiceValue",
  "ExchangeRate",
]);

const form = ref({
  customerTrn: "",
  lpoNo: "",
  deliveryNo: "",
  invoiceNo: "",
  customerName: "",
  date: "",
  grossPayable: "",
  taxPayable: "",
  invoiceValue: "",
  ExchangeRate: "",
});

function toNumberOrZero(num){
  const val = _.toNumber(num)
  if(_.isNaN(val)) {
    return 0
  }
  return val
}

function evaluate(value, rowIdx, colIdx) {
  const rowData = gridData.value[rowIdx] ?? [];
  rowData[colIdx] = value.trim() ?? "";

  if(colIdx >=2 && colIdx <=4){
    const units = toNumberOrZero(rowData[2])
    const unitPriceDhr = toNumberOrZero(rowData[3])
    const unitPriceFils = _.round( (toNumberOrZero(rowData[4]) / 100), 2);

    const unitPrice = unitPriceDhr + unitPriceFils;

    if(units && unitPrice) {
      const grossAmount = _.round(units * unitPrice, 2);
      const grossAmountSplits = grossAmount.toFixed(2).split('.')
      rowData[5] = grossAmountSplits[0]
      rowData[6] = grossAmountSplits[1]

      const taxAmount =  _.round(grossAmount * 5 / 100, 2)
      const taxAmountSplits = taxAmount.toFixed(2).split('.')
      rowData[7] = taxAmountSplits[0]
      rowData[8] = taxAmountSplits[1]

      const netAmount = _.round(grossAmount + taxAmount, 2)
      const netAmountSplits = netAmount.toFixed(2).split('.')
      rowData[9] = netAmountSplits[0]
      rowData[10] = netAmountSplits[1]
    }
  }

  gridData.value[rowIdx] = rowData;
}

function calculateVerticalAmount() {
  const columnSums = new Array(colsCount.value).fill(0);

  for (let rowIdx = 0; rowIdx < rowsCount.value; rowIdx++) {
    const rowData = gridData.value[rowIdx] ?? [];

    if (rowData.length < 1) {
      continue;
    }

    for (let colIdx = 0; colIdx < colsCount.value; colIdx++) {
      const cellValue = rowData[colIdx];
      const parsedValue = parseFloat(cellValue);

      // If the cell contains a valid number, add it to the column sum
      if (!isNaN(parsedValue)) {
        columnSums[colIdx] += parsedValue;
      }
    }
  }

  console.log("Column sums:", columnSums);
  return columnSums;
}


function analyzeGridData() {
  const sum = calculateVerticalAmount().slice(5);
  const values = _.chunk(sum, 2);
  const [grossPayable, taxPayable, invoiceValue] = values.map((v) => {
    let floatValue = v[1] ?? 0;
    floatValue = floatValue / 100;
    return v[0] + floatValue;
  });

  // console.log(grossPayable, taxPayable, invoiceValue);
  form.value.grossPayable = grossPayable;
  form.value.taxPayable = taxPayable;
  form.value.invoiceValue = invoiceValue;
}

watchDebounced(
  gridData,
  analyzeGridData,
  { debounce: 500, maxWait: 1000 , deep: true }, 
)
</script>
