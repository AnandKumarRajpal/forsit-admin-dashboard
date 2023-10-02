var numRows = 500;

var phones = [
  {
    handset: "Huawei P40",
    price: 599,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    handset: "Google Pixel 5",
    price: 589,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    handset: "Apple iPhone 12",
    price: 849,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    handset: "Samsung Galaxy S10",
    price: 499,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    handset: "Motorola Edge",
    price: 549,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];

var data = [];

// populate data
for (var i = 0; i < numRows; i++) {
  var phone = phones[getRandomNumber(0, phones.length)];
  var remainingStock = getRandomNumber(0, 100);

  data.push({
    name: phone.handset,
    price: phone.price,
    description: phone.description,
    stockLevel: remainingStock,
  });
}

var orderData = [];

// populate data
for (var i = 0; i < 50; i++) {
  var random = randomDate(new Date(2023, 0, 1), new Date(2023, 9, 1));
  var randomCount = getRandomNumber(0, 10);
  for (var j = 0; j < randomCount; j++) {
    orderData.push({
      total: getRandomNumber(0, 500),
      timestamp: random,
      count: 1,
    });
  }
}

for (var i = 0; i < 10; i++) {
  orderData.push({
    total: getRandomNumber(0, 500),
    timestamp: new Date(),
  });
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export const dataService = (function () {
  return {
    data,
    orderData: orderData.sort((a, b) => {
      return b.timestamp.getTime() - a.timestamp.getTime();
    }),
  };
})();
