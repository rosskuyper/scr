import React, {useState} from 'react'
import styled from 'styled-components'

export type AreaSelectProps = {
    onAreaSelected: (bounds: DraggedAreaProps) => void
}

export type DraggedAreaProps = {
    height: number
    width: number
    left: number
    top: number
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    cursor: crosshair;
`

const DraggedArea = styled.div.attrs((props: DraggedAreaProps) => ({style: props}))<DraggedAreaProps>`
    position: absolute;
    background: grey;
    opacity: 0.3;
`

/**
 * This function interpolates the relation of the mouse to the drag origin to work out the styles required for the div
 */
const interpolateBounds = (originX: number, originY: number, mouseX: number, mouseY: number): DraggedAreaProps => {
    // In the case where the mouse is on its origin, return a zero size div
    if (originX === mouseX && originY === mouseY) {
        return {
            height: 0,
            width: 0,
            left: 0,
            top: 0,
        }
    }

    return {
        height: Math.abs(originY - mouseY),
        width: Math.abs(originX - mouseX),
        left: Math.min(originX, mouseX),
        top: Math.min(originY, mouseY),
    }
}

export const AreaSelect = ({onAreaSelected}: AreaSelectProps): JSX.Element => {
    // Origin X and Y (once we start dragging)
    const [originX, setOriginX] = useState(0)
    const [originY, setOriginY] = useState(0)

    // The width and height of the selected box
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)

    // Whether we're dragging or not
    const [dragging, setDragging] = useState(false)

    // Start the area select
    const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setOriginX(event.clientX)
        setOriginY(event.clientY)
        setMouseX(event.clientX)
        setMouseY(event.clientY)
        setDragging(true)
    }

    // When we're on the move
    const onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setMouseX(event.clientX)
        setMouseY(event.clientY)
    }

    // Once we're done
    const onMouseUp = () => {
        onAreaSelected(interpolateBounds(originX, originY, mouseX, mouseY))

        setDragging(false)
        setOriginX(0)
        setOriginY(0)
        setMouseX(0)
        setMouseY(0)
    }

    return (
        <Container onMouseDown={onMouseDown} onMouseMove={dragging ? onMouseMove : undefined} onMouseUp={onMouseUp}>
            {dragging && <DraggedArea {...interpolateBounds(originX, originY, mouseX, mouseY)} />}
        </Container>
    )
}
