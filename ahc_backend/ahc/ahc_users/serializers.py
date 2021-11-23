from rest_framework import serializers
from .models import UserProfile, User


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(read_only=True, source="profile")

    class Meta:
        model = User
        fields = "__all__"
