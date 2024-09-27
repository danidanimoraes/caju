import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { generatePath } from "react-router-dom";
import { Registration } from "~/interfaces";
import { clientApi } from "~/service/client";

type Params = {
  registration: Registration;
};

type QueryResponse = AxiosResponse<Registration>;

export const useUpdateRegistration = () => {
  const queryClient = useQueryClient();
  const mutationKey = ["useUpdateRegistration"];

  const mutationFunction = async (params: Params): Promise<QueryResponse> => {
    const url = generatePath("registrations/:id", {
      id: params.registration.id!,
    });

    return clientApi.put(url, params.registration);
  };

  return useMutation({
    mutationKey,
    mutationFn: mutationFunction,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["useRegistrations"] });
    },
  });
};
