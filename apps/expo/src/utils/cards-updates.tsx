import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
  } from "react";

import { UpdateFlashcardInput } from "@feprep/validators";

interface CardsContextValues {
    cardsInfo: UpdateFlashcardInput[];
    setCardsInfo: Dispatch<SetStateAction<UpdateFlashcardInput[]>>;
}

export const CardsContext = createContext<CardsContextValues>({
    cardsInfo: [],
    // esling-disable-next-line
    setCardsInfo: () => {},
});

export const CardsProvider = ({ children }: { children: ReactNode }) => {
    const [cardsInfo, setCardsInfo] = useState<UpdateFlashcardInput[]>([]);

    useEffect(() => {
        console.log("Cards info in useEffect ", cardsInfo);
    }, [cardsInfo]);

    return (
        <CardsContext.Provider value={{ cardsInfo, setCardsInfo }}>
            {children}
        </CardsContext.Provider>
    );
};

export const useCards = () => {
    return useContext(CardsContext);
};
