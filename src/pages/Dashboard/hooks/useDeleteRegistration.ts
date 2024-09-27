import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { generatePath } from "react-router-dom";
import { Registration } from "~/interfaces";
import { clientApi } from "~/service/client";

type Params = {
  id: string;
};

type QueryResponse = AxiosResponse<Registration>;

export const useDeleteRegistration = () => {
  const queryClient = useQueryClient();
  const mutationKey = ["useDeleteRegistration"];

  const mutationFunction = async (params: Params): Promise<QueryResponse> => {
    const url = generatePath("registrations/:id", {
      id: params.id,
    });

    return clientApi.delete(url);
  };

  return useMutation({
    mutationKey,
    mutationFn: mutationFunction,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["useRegistrations"] });
    },
  });
};
