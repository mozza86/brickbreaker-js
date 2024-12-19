export class Button {
    constructor(app, x, y, width, height, text, bgColor="#fff", textColor="#000", onclick=() => {}) {
        this.app = app;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.bgColor = bgColor
        this.textColor = textColor
        this.onclick = onclick;
    }

    draw() {
        let ctx = this.app.ctx

        ctx.fillStyle = this.bgColor;
        ctx.fillRect(this.x, this.y, this.width, this.height)

        ctx.strokeStyle = this.textColor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = this.textColor;
        ctx.font = this.height-this.height/3+"px serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x+this.width/2, this.y+this.height/2);
    }

    update() {
        let ctx = this.app.ctx
        if (this.app.mouseClick != null) {
            let mouseX = this.app.mouseClick.clientX
            let mouseY = this.app.mouseClick.clientY

            ctx.rect(this.x, this.y, this.width, this.height);
            if (this.app.ctx.isPointInPath(mouseX, mouseY)) {
                this.onclick()
            }
        }
    }
}