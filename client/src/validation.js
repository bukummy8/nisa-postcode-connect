
export function validatePostcode(value) {
  const normalized = value.trim().toUpperCase();

  if (!normalized) {
    return {
      valid: false,
      message: "Enter a postcode to continue."
    };
  }

  if (!/^[A-Z0-9]{11}$/.test(normalized)) {
    return {
      valid: false,
      message:
        "Enter an 11-character postcode using letters and numbers, without spaces."
    };
  }

  return {
    valid: true,
    normalized
  };
}

export function validateAddressDetails({
  postcode,
  address,
  fullName
}) {
  if (!postcode.trim() || !address.trim() || !fullName.trim()) {
    return {
      valid: false,
      message:
        "Complete your name, postcode and address before continuing."
    };
  }

  const postcodeResult = validatePostcode(postcode);

  if (!postcodeResult.valid) {
    return {
      valid: false,
      message: "Enter a valid 11-character postcode format."
    };
  }

  return { valid: true };
}
