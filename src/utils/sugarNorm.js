export default function SugarNorm(measurementTime, age) {
  if (measurementTime === "натощак") {
    if (age === 0) return { minSugar: 2.8, maxSugar: 4.4 };
    if (age > 0 && age <= 14) return { minSugar: 3.3, maxSugar: 5.5 };
    if (age > 14 && age <= 60) return { minSugar: 4.1, maxSugar: 5.9 };
    if (age > 60 && age <= 90) return { minSugar: 4.6, maxSugar: 6.4 };
    if (age > 90) return { minSugar: 4.2, maxSugar: 6.7 };
  }

  if (measurementTime === "после еды") {
    if (age === 0)
      return { afterEatingSugarMin: 2.8, afterEatingSugarMax: 5.5 };
    if (age > 0 && age <= 14)
      return { afterEatingSugarMin: 3.3, afterEatingSugarMax: 7.8 };
    if (age > 14 && age <= 60)
      return { afterEatingSugarMin: 4.1, afterEatingSugarMax: 7.8 };
    if (age > 60 && age <= 90)
      return { afterEatingSugarMin: 4.6, afterEatingSugarMax: 8 };
    if (age > 90) return { afterEatingSugarMin: 4.2, afterEatingSugarMax: 8.5 };
  }

  return { measurementTime, age };
}
