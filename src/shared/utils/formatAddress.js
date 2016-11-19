export default function formatAddress (addressComponents) {
  const {length} = addressComponents;
  let result;

  if (length > 3) {
    result = [
      addressComponents[length - 4].long_name,
      addressComponents[length - 2].short_name,
      addressComponents[length - 1].short_name,
    ];
  } else if (length === 3) {
    result = [
      addressComponents[length - 3].long_name,
      addressComponents[length - 1].short_name,
    ];
  } else if (length === 2) {
    result = [
      addressComponents[length - 2].long_name,
      addressComponents[length - 1].short_name,
    ];
  } else {
    result = [addressComponents[0].long_name];
  }

  result = result.join(', ');
  return result;
}
