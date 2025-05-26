Public Class reqFrom
    Private Sub reqFrom_Load(sender As Object, e As EventArgs) Handles MyBase.Load

    End Sub

    Private Sub ADDSTAFFBUTT_Click(sender As Object, e As EventArgs) Handles ADDSTAFFBUTT.Click
        Requisitionitem.Show()
        Me.Hide()
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        ReqStatusFrom.Show()
        Me.Hide()

    End Sub

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        ReqRecviveFrom.Show()
        Me.Hide()

    End Sub

    Private Sub Buttonhome_Click(sender As Object, e As EventArgs) Handles HOMEBUTT.Click
        homepage.Show()
        Me.Hide()

    End Sub
    Private Sub STAFFBUTTHOMEf_Click(sender As Object, e As EventArgs) Handles STAFFBUTTHOME.Click

        StaffForm.Show()
        Me.Hide()
    End Sub
    Private Sub PatientHOMEBUTT_Click(sender As Object, e As EventArgs) Handles PatientHOMEBUTT.Click
        PatientForm.Show()
        Me.Hide()
    End Sub

    Private Sub SuppliesBUTTHOME_Click(sender As Object, e As EventArgs) Handles SuppliesBUTTHOME.Click
        SupFrom.Show()
        Me.Hide()

    End Sub

    Private Sub SuppliersHOMEBUTT_Click(sender As Object, e As EventArgs) Handles SuppliersHOMEBUTT.Click
        supLIERfrom.Show()
        Me.Hide()
    End Sub

    Private Sub RequisitionHOMEBUTT_Click(sender As Object, e As EventArgs) Handles RequisitionHOMEBUTT.Click
        Me.Hide()
    End Sub

    Private Sub DashboardHOMEBUTT_Click(sender As Object, e As EventArgs) Handles DashboardHOMEBUTT.Click
        Dashboard.Show()
        Me.Hide()
    End Sub
End Class