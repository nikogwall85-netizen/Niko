from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.metrics import dp


class NikoApp(App):

    def build(self):
        root = BoxLayout(
            orientation="vertical",
            padding=dp(12),
            spacing=dp(10)
        )

        title = Label(
            text="🐱 NIKO",
            font_size=dp(30),
            size_hint_y=None,
            height=dp(65)
        )
        root.add_widget(title)

        chat = Label(
            text="نيكو: أهلًا ديم! 🐱🤖\nأنا جاهز، قولي لي وش تبين.",
            font_size=dp(17),
            halign="right",
            valign="top"
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

        send_button = Button(
            text="إرسال 💬",
            size_hint_y=None,
            height=dp(55),
            font_size=dp(18)
        )

        def send_message(instance):
            text = message.text.strip()

            if text:
                chat.text += f"\n\nأنت: {text}\nنيكو: وصلتني رسالتك! 🐱✨"
                message.text = ""

        send_button.bind(on_press=send_message)
        root.add_widget(send_button)

        return root


if __name__ == "__main__":
    NikoApp().run()
