import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Registration } from "~/interfaces";
import { clientApi } from "~/service/client";

type Params = {
  registration: Registration;
};

type QueryResponse = AxiosResponse<Registration>;

export const useCreateRegistration = () => {
  const queryClient = useQueryClient();
  const mutationKey = ["useCreateRegistration"];

  const mutationFunction = async (params: Params): Promise<QueryResponse> => {
    return clientApi.post("registrations", params.registration);
  };

  return useMutation({
    mutationKey,
    mutationFn: mutationFunction,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["useRegistrations"] });
    },
  });
};
