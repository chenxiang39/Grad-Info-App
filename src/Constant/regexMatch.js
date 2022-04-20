//should be a negative sign followed by 4 numbers
export const shouldBeNegativeFollowedByFourNumbers = /^-(([0-9]){4})$/;

//should be 4 alphabetical characters or spaces followed by numbers
export const shouldBeFourCharactersFollowedByNumbers = /^[A-Za-z\s]{4,4}[0-9]/;

//should always be ‘-1’
export const shouldBeNegativeOne = /^(-1)$/;

//should be a number(up to two decimal places)
export const shouldBeNumberUpToTwoDecimal = /^\d+(.\d{1,2})?$/;
