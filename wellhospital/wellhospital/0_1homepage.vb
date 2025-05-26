Public Class homepage
    Private Sub Buttonhome_Click(sender As Object, e As EventArgs) Handles HOMEBUTT.Click
        Me.Show()

    End Sub
    Private Sub ButtonStaff_Click(sender As Object, e As EventArgs) Handles STAFFBUTTHOME.Click
        StaffForm.Show()
        Me.Hide()
    End Sub
    Private Sub Patientbtn_Click(sender As Object, e As EventArgs) Handles PatientHOMEBUTT.Click
        PatientForm.Show()
        Me.Hide()
    End Sub

    Private Sub Button4_Click(sender As Object, e As EventArgs) Handles SuppliesBUTTHOME.Click
        SupFrom.Show()
        Me.Hide()

    End Sub

    Private Sub Button5_Click(sender As Object, e As EventArgs) Handles SuppliersHOMEBUTT.Click
        supLIERfrom.Show()
        Me.Hide()
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles RequisitionHOMEBUTT.Click
        reqFrom.Show()
        Me.Hide()
    End Sub

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles DashboardHOMEBUTT.Click
        Dashboard.Show()
        Me.Hide()
    End Sub


End Class