export default (hostComponent) => {
  const csvData = [
    {
      name: "John Doe",
      age: 25,
      country: "USA",
      date: "2022-05-10",
      currency: "$100.50",
      time: "14:30",
      number: 12345,
      text: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Jane Smith",
      age: 32,
      country: "Canada",
      date: "2022-09-15",
      currency: "$50.20",
      time: "09:45",
      number: 67890,
      text: "Consectetur adipiscing elit",
    },
    {
      name: "Mark Johnson",
      age: 28,
      country: "Australia",
      date: "2022-07-01",
      currency: "$75.80",
      time: "18:15",
      number: 54321,
      text: "Sed do eiusmod tempor incididunt",
    },
    {
      name: "Emily Davis",
      age: 30,
      country: "UK",
      date: "2022-11-20",
      currency: "£150.25",
      time: "12:00",
      number: 98765,
      text: "Ut enim ad minim veniam",
    },
    {
      name: "Michael Brown",
      age: 35,
      country: "Germany",
      date: "2022-03-05",
      currency: "€80.90",
      time: "20:45",
      number: 24680,
      text: "Duis aute irure dolor in reprehenderit",
    },
  ];

  const table = csvDataToTable(csvData);
  sortableTable(table);

  hostComponent.appendChild(table);
};
