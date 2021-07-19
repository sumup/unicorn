import { Input, Select, TextArea, LoadingButton } from "@sumup/circuit-ui";
import { useCallback } from "react";

export const RecommendForm = () => {
  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <h2>This is RecommendForm</h2>
      <Input
        label="Merchant name"
        name="merchantName"
        placeholder="Enter merchant name"
      />
      <Select
        label="Select type of merchant business"
        options={[{ label: "Beverage", value: "0" }]}
      />
      <Input
        label="Enter the address"
        name="merchantAddress"
        placeholder="Enter merchant address"
      />
      <TextArea
        label="Why do you recommend it?"
        placeholder="What's special. Dishes, drinks, services"
      />
      <h4>TODO: upload images</h4>
      <LoadingButton type="button" variant="primary">
        Recommend
      </LoadingButton>
    </form>
  );
};
