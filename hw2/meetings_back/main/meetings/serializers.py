from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Meeting
from django.contrib.auth.models import User


pk = None
is_update = False


class MeetingSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Meeting
        fields = ('id', 'created', 'sinceWhen', 'tilWhen', 'user')

    def validate(self, data):
        if not tilWhenAfterSinceWhen(data):
            raise ValidationError("tilWhen must come after sinceWhen.")
        if overlapsWithOtherMeetings(data):
            raise ValidationError("Overlaps with another meeting.")
        return data


class UserSerializer(serializers.ModelSerializer):
    meetings = serializers.PrimaryKeyRelatedField(many=True, queryset=Meeting.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'meetings')


def tilWhenAfterSinceWhen(data):
    return data['sinceWhen'] < data['tilWhen']


def overlapsWithOtherMeetings(data):
    """
    Determines whether the requested meeting time overlaps with other
    meeting times, except its own
    """
    global pk, is_update
    queryset = Meeting.objects.all()
    for queryMeeting in queryset:

        # Check whether the current meeting is equivalent to `queryMeeting`
        if is_update and pk == queryMeeting.id:
            is_update = False
            continue

        # Check time overlap
        result = (queryMeeting.tilWhen < data['sinceWhen']) or \
                 (queryMeeting.sinceWhen > data['tilWhen'])
        if not result:
            return True

    return False


def updatePrimaryKey(_pk):
    """
    Sets primary key for indicating the current ID
    """
    global pk
    pk = _pk


def isUpdate(_is_update):
    """
    Sets whether the current method is PUT
    """
    global is_update
    is_update = _is_update