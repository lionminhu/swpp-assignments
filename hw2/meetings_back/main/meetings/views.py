from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework.response import Response

from datetime import datetime

from .models import Meeting
from .serializers import MeetingSerializer, UserSerializer, updatePrimaryKey, isUpdate
from .permissions import IsOwnerOrReadOnly


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if not user:
        return Response({
            "auth_valid": False,
            "error": "Incorrect username/password"},
            status=HTTP_404_NOT_FOUND)
    token, other = Token.objects.get_or_create(user=user)

    return Response({
        "auth_valid": True,
        "token": token.key}, status=HTTP_200_OK)


class MeetingList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    authentication_classes = (SessionAuthentication, BasicAuthentication)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def put(self, request, *args, **kwargs):
        # provide primary key to serializers module
        updatePrimaryKey(kwargs['pk'])
        # indicate that current method is PUT
        isUpdate(True)
        return self.update(request, *args, **kwargs)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer