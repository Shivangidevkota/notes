from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Note
from .serializers import NoteSerializer
from rest_framework.permissions import IsAuthenticated

class NoteListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        notes = Note.objects.filter(user=request.user).order_by('-created_at')  # Sort by created_at in descending order
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoteDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        """
        Retrieve a single note for the authenticated user by pk.
        """
        try:
            return Note.objects.get(pk=pk, user=user)  # Ensure it's the user's note
        except Note.DoesNotExist:
            return None

    def get(self, request, pk):
        """
        Retrieve a single note for the authenticated user by pk.
        """
        note = self.get_object(pk, request.user)  # Use get_object instead of self.get
        if not note:
            return Response({"detail": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = NoteSerializer(note)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Update a single note by pk.
        """
        note = self.get_object(pk, request.user)  # Use get_object instead of self.get
        if not note:
            return Response({"detail": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = NoteSerializer(note, data=request.data, partial=True)  # Partial update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete a single note by pk.
        """
        note = self.get_object(pk, request.user)  # Use get_object instead of self.get
        if not note:
            return Response({"detail": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

 