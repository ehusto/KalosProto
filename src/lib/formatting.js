// File: src/utils/formatting.js

// This function takes a string of digits (e.g., "9127594733")
// and formats it into a standard US phone number format.
export const formatPhoneNumber = (phoneString) => {
  // First, clean the string of any non-digit characters
  const cleaned = ("" + phoneString).replace(/\D/g, "");

  // Check if the cleaned string has 10 digits
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    // If it matches, format it as (123) 456-7890
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // If the string is not a valid 10-digit number,
  // return the original string as a fallback.
  return phoneString;
};
