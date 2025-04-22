import Konva from "konva";
import type { Dot } from "./models";

export function createDotGroup(dot: Dot): Konva.Group {
	const group = new Konva.Group({
		id: `dot-${dot.id}`,
		x: dot.x,
		y: dot.y,
		draggable: true,
	});

	const circle = new Konva.Circle({
		x: 0,
		y: 0,
		radius: dot.radius,
		fill: dot.color,
		stroke: "#000",
		strokeWidth: 1,
	});
	group.add(circle);

	dot.comments.forEach((c, idx) => {
		const fontSize = 16;
		const padding = 5;

		const textNode = new Konva.Text({
			id: `comment-text-${c.id}`,
			text: c.text,
			fontSize: fontSize,
		});
		const textWidth = textNode.width();
		const textHeight = textNode.height();

		const bgWidth = textWidth + padding * 2;
		const bgHeight = textHeight + padding * 2;

		const x = -bgWidth / 2;
		const y = circle.radius() + 10 + idx * (bgHeight + 5);

		const rect = new Konva.Rect({
			id: `comment-rect-${c.id}`,
			x,
			y,
			width: bgWidth,
			height: bgHeight,
			fill: c.background,
			cornerRadius: 2,
			stroke: "gray",
			strokeWidth: 1,
		});

		textNode.x(x + padding);
		textNode.y(y + padding);

		group.add(rect);
		group.add(textNode);
	});

	return group;
}

export function renderDots(
	stage: Konva.Stage,
	layer: Konva.Layer,
	dots: Dot[],
): void {
	layer.destroyChildren();
	for (const d of dots) {
		const grp = createDotGroup(d);
		layer.add(grp);
	}
	layer.draw();
}
