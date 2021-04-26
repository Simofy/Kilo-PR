export const formatLocation = (
  response: any
): { country: string; countryCode: string } => {
  let address: { country: string; countryCode: string } = {
    country: "",
    countryCode: "",
  };
  for (let i = 0; i < response.results[0].address_components.length; i++) {
    for (
      let j = 0;
      j < response.results[0].address_components[i].types.length;
      j++
    ) {
      switch (response.results[0].address_components[i].types[j]) {
        case "country":
          address = {
            country: response.results[0].address_components[i].long_name,
            countryCode: response.results[0].address_components[i].short_name,
          };
      }
    }
  }
  return address;
};
