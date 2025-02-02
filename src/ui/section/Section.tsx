import { CSSProperties, MouseEvent, ReactNode, useState } from "react";
import "./Section.scss";
import { Icon } from "../icon/Icon";
import { useInstance } from "../../hooks/useInstance";
import { FloatingSectionController } from "../../controllers/FloatingSectionController";

type Props = {
	label: string,
	children?: ReactNode,
	defaultState?: boolean,
	className?: string
}

export function Section(props: Props) {
	const [open, setOpen] = useState(props.defaultState ?? true)

	const floatingController = useInstance(() => {
		return new FloatingSectionController()
	}, controller => {
		controller.destroy()
	})

	const { floating, position, dragging } = floatingController.useState()

	const className = `Section ${props.className ?? ""}`

	function onFloatingClick(e: MouseEvent) {
		e.stopPropagation()
		floatingController.setFloating(!floating, e)
	}

	return <div
		className={className}
		data-open={open}
		data-floating={floating}
		style={{
			"--x": position.x + "px",
			"--y": position.y + "px",
		} as CSSProperties}
	>
		<label
			onMouseUp={() => {
				if (!dragging)
					setOpen(open => !open)
			}}
		>
			<Icon name="arrow_down" />
			<p onMouseDown={floatingController.onMouseDown}>
				{props.label}
			</p>
			<div
				className="Section__float-button"
				onMouseUp={onFloatingClick}
			>
				<Icon name={floating ? "docked" : "windowed"} />
			</div>
		</label>
		<article>
			{props.children}
		</article>
	</div>
}
