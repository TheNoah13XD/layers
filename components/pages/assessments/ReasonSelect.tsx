import { Section } from "@components/styled";
import { ShapeFour, ShapeOne, ShapeThree, ShapeTwo } from "@components/shapes";

export interface ReasonSelectProps {
    selectedShapes: Set<string>;
    handleSelect: (shape: string) => void;
    stylize?: string;
}


export const ReasonSelect = ({ selectedShapes, handleSelect, stylize }: ReasonSelectProps) => {
    return (
        <Section stylize={`relative flex-row flex-wrap self-center w-[320px] h-[460px] ${stylize}`}>
            <ShapeOne stylize="absolute top-0 right-0" selected={selectedShapes.has('shapeOne')} onPress={() => handleSelect('shapeOne')} />
            <ShapeTwo stylize="absolute top-[93px] left-0" selected={selectedShapes.has('ShapeTwo')} onPress={() => handleSelect('ShapeTwo')} />
            <ShapeThree stylize="absolute top-[186px] right-0" selected={selectedShapes.has('ShapeThree')} onPress={() => handleSelect('ShapeThree')} />
            <ShapeFour stylize="absolute bottom-0 left-0 -z-10" selected={selectedShapes.has('ShapeFour')} onPress={() => handleSelect('ShapeFour')} />
        </Section>
    );
}

