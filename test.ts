const arr = [5, 3, 5, 5, 10, 3, 1, 5, 3, 1, 5, 3, 5, 5, 4, 3, 9, 5];

interface IFrequency {
  num: number;
  qty: number;
}

let frequency: IFrequency[] = [];

arr.map(number => {
  const numberInArray = frequency.find(freq => freq.num === number);

  if (!numberInArray) {
    frequency = [
      ...frequency,
      {
        num: number,
        qty: 1,
      } as IFrequency,
    ];

    return;
  }

  frequency = frequency.filter(freq => freq.num !== number);

  frequency = [
    ...frequency,
    {
      num: number,
      qty: numberInArray.qty + 1,
    },
  ];
});

let number = 0;
let qty = 0;

frequency.forEach(freq => {
  if (freq.qty && freq.qty > qty) {
    qty = freq.qty;
    number = freq?.num;
  }
});

console.log(
  `The number that appears more times is ${number} and this number appears ${qty} times`
);
