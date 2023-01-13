import pandas as pd
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    data = pd.read_json("static/js/items.json", orient="split").round(5)
    return render_template("index.html", data=data)


@app.context_processor
def utility_processor():
    def get_color(val, quantiles):
        n_sections = len(quantiles) + 1
        step = 120 / n_sections
        start = step / 2
        end = start + (step * n_sections)
        hues = list(range(int(start), int(end) + 1, int(step)))
        for _index, quantile in enumerate(quantiles):
            if val < quantile:
                break
        hue = hues[_index]
        hue = min(hue, 120)
        hue = max(hue, 0)
        return f"hsl({hue}, 100%, 50%)"

    return dict(get_color=get_color)


if __name__ == "__main__":
    with app.app_context():
        data = pd.read_json("static/js/items.json", orient="split").round(5)
        rendered = render_template("index.html", data=data)
        print(rendered)
