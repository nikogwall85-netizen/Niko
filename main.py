from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.graphics import Color, RoundedRectangle
from kivy.metrics import dp


class NikoApp(App):

    def build(self):
        root = BoxLayout(
            orientation="vertical",
            padding=dp(12),
            spacing=dp(10)
        )

        with root.canvas.before:
            Color(0.03, 0.03, 0.03, 1)
            self.bg = RoundedRectangle(
                pos=root.pos,
                size=root.size,
                radius=[dp(20)]
            )

        root.bind(
            pos=lambda obj, value: setattr(self.bg, "pos", value),
            size=lambda obj, value: setattr(self.bg, "size", value)
        )

        title = Label(
            text="🤖🐱 NIKO",
            font_size=dp(30),
            size_hint_y=None,
            height=dp(65),
            color=(1, 0.45, 0.05, 1)
        )
        root.add_widget(title)

        niko_face = Label(
            text="╭────────────╮\n"
                 "│   ◉    ◉   │\n"
                 "│     ^      │\n"
                 "│   \\___/    │\n"
                 "╰────────────╯",
            font_size=dp(25),
            halign="center",
            valign="middle",
            size_hint_y=None,
            height=dp(150),
            color=(1, 0.55, 0.1, 1)
        )
        root.add_widget(niko_face)

        chat = Label(
            text="نيكو: أهلًا يا ديم! 🐱🤖\nأنا جاهز، قولي لي وش تبين.",
            font_size=dp(17),
            halign="right",
            color=(1, 1, 1, 1)
        )
        root.add_widget(chat)

        message = TextInput(
            hint_text="اكتبي لنيكو...",
            multiline=False,
            size_hint_y=None,
            height=dp(52),
            font_size=dp(17)
        )
        root.add_widget(message)

        buttons = BoxLayout(
            size_hint_y=None,
            height=dp(58),
            spacing=dp(8)
        )

        buttons.add_widget(Button(text="🎙️", font_size=dp(24)))
        buttons.add_widget(Button(text="🖼️", font_size=dp(24)))
        buttons.add_widget(Button(text="إرسال", font_size=dp(17)))
        buttons.add_widget(Button(text="⚙️", font_size=dp(22)))

        root.add_widget(buttons)

        return root


if __name__ == "__main__":
    NikoApp().run()
