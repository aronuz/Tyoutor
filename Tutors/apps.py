from django.apps import AppConfig


class TutorsConfig(AppConfig):
    name = 'Tutors'

    def ready(self):
        import Tutors.signals
