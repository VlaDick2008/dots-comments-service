import type Konva from "konva";
import { createComment, deleteDot, updateComment, updateDot } from "./api";
import type { CommentCreateDto, CommentUpdateDto } from "./models";
import { toNumber } from "./utils";

export function bindEvents(
	stage: Konva.Stage,
	layer: Konva.Layer,
	reload: () => Promise<void>,
): void {
	layer.on("dragend", async (e) => {
		const group = e.target as Konva.Group;
		const id = Number(group.id().split("-")[1]);

		const { x, y } = group.getAttrs();
		const circle = group.findOne("Circle") as Konva.Circle;
		const radius = circle.radius();
		const color = circle.fill() as string;

		await updateDot({ id, x: x ?? 0, y: y ?? 0, radius, color });
	});

	layer.on("dblclick dbltap", async (e) => {
		const group = e.target.findAncestor("Group");
		if (!group) return;

		const shape = e.target as Konva.Circle;

		if (e.evt.ctrlKey && shape.getClassName() === "Circle") {
			const parentGroup = shape.getParent() as Konva.Group;
			const id = Number(parentGroup.id().split("-")[1]);
			const newRadius =
				Number(prompt("Радиус", String(shape.radius()))) || shape.radius();
			const newColor =
				prompt("Цвет", shape.fill() as string) || (shape.fill() as string);

			await updateDot({
				id,
				x: parentGroup.x(),
				y: parentGroup.y(),
				radius: newRadius,
				color: newColor,
			});
			await reload();

			return;
		}

		if (!e.evt.ctrlKey) {
			const id = Number(group.id().split("-")[1]);

			await deleteDot(id);

			group.destroy();
			layer.draw();
		}
	});

	stage.on("click", async (e) => {
		const isShift = e.evt.shiftKey;
		const isCtrl = e.evt.ctrlKey;
		const group = e.target.findAncestor("Group") as Konva.Group;
		if (!group) return;
		const dotId = Number(group.id().split("-")[1]);
		const shape = e.target as Konva.Node;

		if (isShift && !isCtrl) {
			const text = prompt("Текст комментария");
			if (!text) return;
			const bg = prompt("Цвет фона", "#ffff00") || "#ffff00";
			await createComment({ dotId, text, background: bg });
			await reload();
			return;
		}

		if (isCtrl && !isShift) {
			const idAttr = shape.id();
			if (
				idAttr.startsWith("comment-text-") ||
				idAttr.startsWith("comment-text-")
			) {
				const commentId = Number(idAttr.split("-")[2]);

				const currentTextNode =
					shape.getClassName() === "Text"
						? (shape as Konva.Text)
						: ((shape.getParent() as Konva.Group).findOne(
								`#comment-text-${commentId}`,
							) as Konva.Text);

				const currentBgNode =
					shape.getClassName() === "Rect"
						? (shape as Konva.Rect)
						: ((shape.getParent() as Konva.Group).findOne(
								`#comment-rect-${commentId}`,
							) as Konva.Rect);

				const newText = prompt("Новый текст", currentTextNode.text());
				if (newText == null) return;
				const newBg =
					prompt("Новый цвет фона", currentBgNode.fill() as string) ||
					(currentBgNode.fill() as string);

				const dto: CommentUpdateDto = {
					id: commentId,
					text: newText,
					background: newBg,
				};
				await updateComment(dto);
				await reload();
			}
		}
	});
}
