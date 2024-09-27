import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Registration } from "~/interfaces";
import { clientApi } from "~/service/client";

type Params = {
  cpf?: string;
};

type QueryResponse = AxiosResponse<Registration[]>;

export const useRegistrations = (params: Params, enabled: boolean) => {
  const queryKey = ["useRegistrations", { cpf: params.cpf }];

  const queryFunction = async (): Promise<QueryResponse> => {
    // json-server v1 não suporta cpf_like query param, então vou simular

    const registrations = await clientApi.get("registrations");

    if (registrations.data && params.cpf) {
      const filterByCPF = (registration: Registration) =>
        registration.cpf.includes(params.cpf!);

      registrations.data = registrations.data.filter(filterByCPF);
    }

    return registrations;
  };

  return useQuery({ queryKey, queryFn: queryFunction, enabled });
};
