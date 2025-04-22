import "@progress/kendo-ui";

import $ from "jquery";
import Konva from "konva";
import { createDot, getDots } from "./api";
import { renderDots } from "./dotRenderer";
import { bindEvents } from "./events";
import { clamp, toNumber } from "./utils";

document.addEventListener("DOMContentLoaded", async () => {
	const container = document.querySelector("#container");
	if (!container) return;

	const width = container.clientWidth;
	const height = container.clientHeight;

	const stage = new Konva.Stage({
		container: "container",
		width,
		height,
	});

	const layer = new Konva.Layer();
	stage.add(layer);

	bindEvents(stage, layer, reload);

	async function reload() {
		const dots = await getDots();
		renderDots(stage, layer, dots);
	}

	await reload();

	$("#toolbar").html(`
    <input id="x" type="number" placeholder="X" />
    <input id="y" type="number" placeholder="Y" />
    <input id="r" type="number" placeholder="Радиус" />
    <input id="col" type="color" value="#000000" />
    <button id="add">Добавить</button>
  `);
	$("#add").on("click", async () => {
		const x = clamp(toNumber($("#x").val()), 0, width);
		const y = clamp(toNumber($("#y").val()), 0, height);
		const radius = clamp(toNumber($("#r").val()), 5, 100);
		const color = $("#col").val() as string;
		await createDot({ x, y, radius, color });
		await reload();
	});
});
