import { CSSProperties, useEffect, useRef } from "react";
import { ContextualMenuAction, ContextualMenuController } from "../../controllers/ContextualMenuController";
import { Injection } from "../../utils/Injection";
import "./ContextualMenuRenderer.scss";
import { Icon } from "../icon/Icon";

type Props = {}

export function ContextualMenuRenderer(props: Props) {
	const ref = useRef<HTMLUListElement | null>(null)
	const { actions, open, position } = Injection.get(ContextualMenuController).useState()

	useEffect(() => {
		function onclick(e: MouseEvent) {
			if (ref.current?.contains(e.target as HTMLElement))
				return

			Injection.get(ContextualMenuController).close()
		}

		window.addEventListener('mousedown', onclick)

		return () => window.removeEventListener('mousedown', onclick)
	}, [])

	return <ul
		className="ContextualMenuRenderer"
		data-open={open}
		ref={ref}
		style={{
			"--x": position.x + "px",
			"--y": position.y + "px",
		} as CSSProperties}
	>
		{
			actions.map((action, i) => <li key={i}><ActionRenderer action={action} /></li>)
		}
	</ul>
}

function ActionRenderer(props: { action: ContextualMenuAction }) {
	function onClick() {
		if ("action" in props.action) {
			props.action.action()
			Injection.get(ContextualMenuController).close()
		}
	}

	return <div
		className="ActionRenderer"
		onClick={onClick}
		data-action={"action" in props.action}
	>
		{props.action.label}
		{
			"actions" in props.action ?
				<>
					<Icon name="arrow_down" />
					<ul className="ActionRenderer__actions">
						{
							props.action.actions.map((action, i) => <li key={i}>
								<ActionRenderer action={action} />
							</li>)
						}
					</ul>
				</> : undefined
		}
	</div>
}