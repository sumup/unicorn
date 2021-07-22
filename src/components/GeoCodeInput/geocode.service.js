export const getAddressFieldObject = (selection, option) => {
  const foundObj = selection.context.find((obj) => obj.id.includes(option));
  return foundObj.text;
};

export const getRegionId = (regionName, regions) => {
  const foundRegion = regions.find((obj) => obj.name === regionName);

  return foundRegion.id;
};

export const formatUSAddress = (selection, country, regions) => {
  // Mapbox treats US territories as separate countries and returns different formatting for the region and city names.
  const formattedAddress = {
    address_line1: `${selection.address ? selection.address : ''} ${
      selection.text
    }`,
    city: getAddressFieldObject(
      selection,
      country === 'United States' ? 'place' : 'region',
    ),
    region_name: getAddressFieldObject(
      selection,
      country === 'United States' ? 'region' : 'country',
    ),
    post_code: getAddressFieldObject(selection, 'postcode'),
  };

  formattedAddress.region_id = getRegionId(
    formattedAddress.region_name,
    regions,
  );
  return formattedAddress;
};

export const search = (searchValue) => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    searchValue,
  )}.json?access_token=${accessToken}&types=address`;

  return new Promise((resolve, reject) =>
    fetch(uri)
      .then((response) => response.json())
      .then((response) => {
        if (response.features.length > 0) {
          resolve(response.features);
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        reject(console.error(err, 'Mapbox API error'));
      }),
  );
};
