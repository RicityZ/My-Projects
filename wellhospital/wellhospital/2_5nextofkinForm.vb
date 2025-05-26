Imports System.Data.SqlClient

Public Class nextofkinForm
    Public Sub LoadNextofKin(ptID As String)
        ' ตั้งค่า ptID ที่จะแสดงใน TextBox
        TextBoxNextKinID.Text = ptID

        ' SQL Query เพื่อดึงข้อมูลจาก Next of Kin ที่เกี่ยวกับ Pt_ID
        Dim query As String = "SELECT * FROM Next_of_kin WHERE Pt_ID = @Pt_ID"

        ' การเชื่อมต่อฐานข้อมูล
        Using conn As New SqlConnection("Data Source=KITTY\DB1101171;Initial Catalog=HOSPITAL;Integrated Security=True")
            Using cmd As New SqlCommand(query, conn)
                ' เพิ่ม Parameter สำหรับ SQL Query
                cmd.Parameters.AddWithValue("@Pt_ID", ptID)

                ' เปิดการเชื่อมต่อ
                conn.Open()

                ' ใช้ SqlDataReader เพื่ออ่านข้อมูลจากฐานข้อมูล
                Using reader As SqlDataReader = cmd.ExecuteReader()
                    If reader.Read() Then
                        ' แสดงข้อมูลใน TextBox

                        nfkID.Text = reader("Nextofkin_ID").ToString()
                        TextBoxNextKinName.Text = reader("Nextofki_name").ToString()
                        TextBoxNextKinLastName.Text = reader("Nextofkin_lastname").ToString()
                        TextBoxTel.Text = reader("Nextofki_tel").ToString()
                        TextBoxAddress.Text = reader("Nextofki_address").ToString()
                        TextBoxRelationship.Text = reader("Nextofki_relationship").ToString()
                    Else
                        MessageBox.Show("ไม่พบข้อมูล Next of Kin สำหรับ Pt_ID นี้")
                    End If
                End Using
            End Using
        End Using
    End Sub


    Private Sub TextBoxNextKinLastName_TextChanged(sender As Object, e As EventArgs) Handles TextBoxNextKinName.TextChanged

    End Sub

    Private Sub TextBoxLocalDoctorAddress_TextChanged(sender As Object, e As EventArgs) Handles TextBoxAddress.TextChanged

    End Sub

    Friend Sub LoadNextOfKinData(selectedPtID As String)
        Throw New NotImplementedException()
    End Sub

    Private Sub Button6_Click(sender As Object, e As EventArgs) Handles Button6.Click
        Me.Hide()
    End Sub
End Class