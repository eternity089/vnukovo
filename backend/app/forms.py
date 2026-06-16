from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User


class UserRegisterForm(UserCreationForm):
    password1 = forms.CharField(
        label="Пароль",
        widget=forms.PasswordInput(attrs={
            "class": "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400",
            "placeholder": "Введите пароль"
        })
    )
    password2 = forms.CharField(
        label="Подтверждение пароля",
        widget=forms.PasswordInput(attrs={
            "class": "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400",
            "placeholder": "Повторите пароль"
        })
    )
    class Meta:
        model = User
        fields = ["name", "surname", "phone", "email"]

        widgets = {
            "name": forms.TextInput(attrs={
                "class": "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400",
                "placeholder": "Имя"
            }),
            "surname": forms.TextInput(attrs={
                "class": "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400",
                "placeholder": "Фамилия"
            }),
            "phone": forms.TextInput(attrs={
                "class": "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400",
                "placeholder": "Номер телефона"
            }),
            "email": forms.EmailInput(attrs={
                "class": "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400",
                "placeholder": "Email"
            }),
            "rules" : forms.CheckboxInput(attrs={
                "class" : "w-full px-4 py-2",
            })
        }

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])

        if commit:
            user.save()

        return user