// rotas e seus parametros

export declare global{
    namespace ReactNavigation{

        interface RootParamList{
            home: undefined;// nao precisa de parametro. è so ir para a tela inicial
            new: undefined;// nao precisa de parametro. é so ir para a tela de novo habit
            habit: {// aqui precisa do parametro data, usada para diferenciar entre cada dia, e mostrar os habitos desse dia.
                date: string
            }
        }
    }
}