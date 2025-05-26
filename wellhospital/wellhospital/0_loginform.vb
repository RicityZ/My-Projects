
Public Class LoginForm
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        Dim correctUsername As String = "admin"
        Dim correctPassword As String = "1234"


        If TextBox1.Text = correctUsername And TextBox2.Text = correctPassword Then
            MessageBox.Show("Login Successful!")
            Dim homepage As New homepage()
            homepage.Show()
            Me.Hide()
        Else
            MessageBox.Show("Invalid Username or Password.")
        End If
    End Sub
End Class


