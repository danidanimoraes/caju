# Caju Front End Teste

Na `Tela de cadastro` é possível cadastrar um usuário novo.

![tela de cadastro vazia](images/empty-form.png)

Em caso de erros de validação, são mostradas mensagens para auxiliar o usuário, e enquanto isso o botão de Cadastrar permanece desabilitado

![tela de cadastro contendo erros de validação em todos os campos](images/form-validations.png)

Quando todos os dados estão válidos, o botão de Cadastrar é habilitado

![tela de cadastro com todos os campos válidos](images/valid-form.png)

O usuário é criado na coluna `Pronto para revisar`.

![dashboard com usuário criado na coluna de pronto para revisar](images/created-user.png)

A busca é executada apenas quando um CPF válido é digitado (11 dígitos):

![dashboard com busca executada](images/filtered-user.png)

Em caso de não haver nenhum resultado, é mostrada uma tela de empty state:

![empty state](images/empty-state.png)

Uma modal de confirmação é mostrada quando o usuário clica nas ações de revisar, aprovar, reprovar e remover um usuário:

![dashboard mostrando modal de confirmação](images/modal.png)

Uma snakcbar é mostrada ao executar as ações:

![dashboard mostrando snackbar de sucesso](images/snackbar.png)
